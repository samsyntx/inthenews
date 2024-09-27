from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from .models import Blog
from .serializers import BlogSerializer
from drf_yasg.utils import swagger_auto_schema

from .models import Blog

# Create Blog
class BlogCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=BlogSerializer)
    def post(self, request):
        serializer = BlogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get All Except Latest Three
class BlogExceptLatestThreeAPIView(ListAPIView):
    serializer_class = BlogSerializer

    def get_queryset(self):
        return Blog.objects.all().order_by('-created_at')[3:]

# Latest Three
class BlogLatestThreeAPIView(ListAPIView):
    serializer_class = BlogSerializer

    def get_queryset(self):
        return Blog.objects.all().order_by('-created_at')[:3]

# Pagination
class BlogPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response({
            'results': data,
            'total_pages': self.page.paginator.num_pages,
            'current_page': self.page.number
        })

# Paginated Blog List
class PaginatedBlogListAPIView(ListAPIView):
    serializer_class = BlogSerializer
    pagination_class = BlogPagination

    def get_queryset(self):
        return Blog.objects.all().order_by('-created_at')
