from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Blog
    
class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['title', 'description', 'cover_image', 'topic', 'meta_keywords', 'content', 'created_at']

