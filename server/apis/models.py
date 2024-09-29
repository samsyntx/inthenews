from django.db import models
from django.contrib.auth.models import User

class Blog(models.Model):
    TOPIC_CHOICES = [
        ('tech', 'Technology'),
        ('health', 'Health'),
        ('finance', 'Finance'),
        ('education', 'Education'),
        ('entertainment', 'Entertainment'),
        ('event', 'Event'),
        ('other', 'Other')
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    main_heading = models.CharField(max_length=255, blank=True, null=True)  # New field added
    description = models.TextField()
    cover_image_url = models.URLField(max_length=255, blank=True, null=True)  # Updated field type
    topic = models.CharField(max_length=100, choices=TOPIC_CHOICES, default='other')  
    created_at = models.DateTimeField(auto_now_add=True)
    meta_keywords = models.CharField(max_length=255, blank=True, null=True)  
    content1 = models.TextField(blank=True, null=True)
    content2 = models.TextField(blank=True, null=True)
    content3 = models.TextField(blank=True, null=True)
    content4 = models.TextField(blank=True, null=True)
    image1_url = models.URLField(max_length=255, blank=True, null=True)  # New field added
    image2_url = models.URLField(max_length=255, blank=True, null=True)  # New field added
    image3_url = models.URLField(max_length=255, blank=True, null=True)  # New field added

    def __str__(self):
        return self.title
    
    class Meta:
        permissions = [
            ('create_blog', 'Can create blogs'),
            ('edit_blog', 'Can edit blogs'),
            ('read_blog', 'Can read blogs'),
            ('remove_blog', 'Can delete blogs'),  
        ]
