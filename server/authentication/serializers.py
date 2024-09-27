from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})


class ConfirmEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()
    confirmation_code = serializers.CharField(max_length=6)


class ResendOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class ProfileDetailSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    role = serializers.CharField(read_only=True)
    email_confirmed = serializers.BooleanField(read_only=True)

    class Meta:
        model = Profile
        fields = ['username', 'email', 'first_name', 'last_name', 'profile_picture', 'role', 'email_confirmed']

class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['first_name', 'last_name', 'profile_picture']

    def update(self, instance, validated_data):
        user = instance.user
        user.first_name = validated_data.get('first_name', user.first_name)
        user.last_name = validated_data.get('last_name', user.last_name)
        user.save()

        profile_picture = validated_data.get('profile_picture', instance.profile_picture)
        instance.profile_picture = profile_picture

        instance.save()
        return instance
    



