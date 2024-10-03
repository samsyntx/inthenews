from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Blog

class CreateBlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = [
            'title',
            'slug',
            'main_heading',
            'description',
            'cover_image_url',
            'topic',
            'meta_keywords',
            'content1',
            'content2',
            'content3',
            'content4',
            'image1_url',
            'image2_url',
            'image3_url'
        ]

class BlogMetaSearializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['id','slug', 'title', 'description', 'cover_image_url', 'topic', 'meta_keywords', 'created_at']
    
class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['id','slug','title','main_heading','description','cover_image_url',
            'topic',
            'meta_keywords',
            'content1',
            'content2',
            'content3',
            'content4',
            'image1_url',
            'image2_url',
            'image3_url', 'created_at']

