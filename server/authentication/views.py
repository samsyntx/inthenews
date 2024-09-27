from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from dotenv import load_dotenv
from drf_yasg.utils import swagger_auto_schema
from django.utils import timezone
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotAuthenticated
from rest_framework.renderers import JSONRenderer

from .models import Profile

from .serializers import RegisterSerializer, ConfirmEmailSerializer, ResendOTPSerializer, LoginSerializer, ProfileDetailSerializer, ProfileUpdateSerializer

import os

load_dotenv()

class HomeAPI(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [JSONRenderer]

    def get(self, request):
        if not request.user.is_authenticated:
            raise NotAuthenticated(detail="You must be logged in to access this resource.")
        
        user = request.user  
        
        return Response({
            'message': f'Welcome {user.username}!',
            'email': user.email
        }, status=status.HTTP_200_OK)

class RegisterAPI(APIView):
    @swagger_auto_schema(request_body=RegisterSerializer)
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]

            if User.objects.filter(email=email).exists():
                return Response(
                    {"error": "Email is already registered."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if User.objects.filter(username=username).exists():
                return Response(
                    {"error": "Username already taken."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            confirmation_code = get_random_string(6, "0123456789")

            is_confirm_send = send_mail(
                "Confirm your email",
                f"Your confirmation code is: {confirmation_code}",
                os.getenv("EMAIL_HOST_USER"),
                [email],
                fail_silently=False,
            )

            if is_confirm_send:
                user = User.objects.create_user(
                    username=username, email=email, password=password
                )
                user.is_active = False
                user.save()

                Profile.objects.create(user=user, confirmation_code=confirmation_code)

                return Response(
                    {
                        "message": "Registration successful. Please check your email for the confirmation code.",
                        "username": user.username,
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"error": "Unable to send confirmation email. Registration failed."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ConfirmEmailAPI(APIView):
    @swagger_auto_schema(request_body=ConfirmEmailSerializer)
    def post(self, request):
        serializer = ConfirmEmailSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            confirmation_code = serializer.validated_data["confirmation_code"]

            try:
                user = User.objects.get(email=email)
                profile = Profile.objects.get(user=user)

                # Check if the OTP matches
                if profile.confirmation_code == confirmation_code:
                    # Mark the email as confirmed
                    profile.email_confirmed = True
                    profile.save()

                    # activate the user here
                    user.is_active = True
                    user.save()

                    return Response(
                        {"message": "Email confirmed successfully."},
                        status=status.HTTP_200_OK,
                    )
                else:
                    return Response(
                        {"error": "Invalid confirmation code."},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
            except User.DoesNotExist:
                return Response(
                    {"error": "User with this email does not exist."},
                    status=status.HTTP_404_NOT_FOUND,
                )
            except Profile.DoesNotExist:
                return Response(
                    {"error": "Profile does not exist for this user."},
                    status=status.HTTP_404_NOT_FOUND,
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ResendOTPAPI(APIView):
    @swagger_auto_schema(request_body=ResendOTPSerializer)
    def post(self, request):
        serializer = ResendOTPSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]

            try:
                user = User.objects.get(email=email)
                profile = Profile.objects.get(user=user)

                # Check if the email is already confirmed
                if profile.email_confirmed:
                    return Response(
                        {"error": "Email is already confirmed."},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                # Check if the user can request a new OTP (e.g., 60 seconds must have passed)
                time_diff = timezone.now() - profile.last_otp_sent
                if time_diff.total_seconds() < 60:
                    return Response(
                        {"error": "Please wait before requesting a new OTP."},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                # Generate a new OTP
                new_confirmation_code = get_random_string(6, "0123456789")
                profile.confirmation_code = new_confirmation_code
                profile.last_otp_sent = timezone.now()  # Update the last OTP sent time
                profile.save()

                # Resend the confirmation email
                is_confirm_send = send_mail(
                    "Resend Confirmation OTP",
                    f"Your new confirmation code is: {new_confirmation_code}",
                    os.getenv("EMAIL_HOST_USER"),
                    [email],
                    fail_silently=False,
                )

                if is_confirm_send:
                    return Response(
                        {"message": "New confirmation code has been sent to your email."},
                        status=status.HTTP_200_OK,
                    )
                else:
                    return Response(
                        {"error": "Failed to send confirmation email."},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    )

            except User.DoesNotExist:
                return Response(
                    {"error": "User with this email does not exist."},
                    status=status.HTTP_404_NOT_FOUND,
                )
            except Profile.DoesNotExist:
                return Response(
                    {"error": "Profile does not exist for this user."},
                    status=status.HTTP_404_NOT_FOUND,
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginAPIView(APIView):
    @swagger_auto_schema(request_body=LoginSerializer)
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']

            user = authenticate(username=username, password=password)
            if user is not None:
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)

                return Response(
                    {
                        'access': access_token,
                        'refresh': refresh_token
                    },
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'error': 'Invalid credentials'},
                    status=status.HTTP_401_UNAUTHORIZED
                )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    
class ProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = Profile.objects.filter(user=request.user).first()
            if profile is None:
                return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)
            serializer = ProfileDetailSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @swagger_auto_schema(request_body=ProfileUpdateSerializer)
    def put(self, request):
        try:
            profile = Profile.objects.get(user=request.user)
            serializer = ProfileUpdateSerializer(profile, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Profile.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)


