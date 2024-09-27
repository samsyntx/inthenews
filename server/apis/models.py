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
    description = models.TextField()
    cover_image = models.ImageField(upload_to='cover_images/', blank=True, null=True)
    topic = models.CharField(max_length=100, choices=TOPIC_CHOICES, default='other')  
    created_at = models.DateTimeField(auto_now_add=True)
    meta_keywords = models.CharField(max_length=255, blank=True, null=True)  
    content = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title
