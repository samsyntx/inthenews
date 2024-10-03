from django.contrib import admin
from .models import Blog

class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'main_heading', 'user', 'topic', 'created_at')  # Added main_heading to display
    
    # Conditionally display the user field for superusers
    def get_fields(self, request, obj=None):
        fields = ['title', 'slug', 'main_heading', 'description', 'cover_image_url', 'topic', 'meta_keywords',
                  'content1', 'content2', 'content3', 'content4', 
                  'image1_url', 'image2_url', 'image3_url']
        if request.user.is_superuser:
            fields.append('user')  # Allow superusers to choose the blog creator
        return fields

    readonly_fields = ('created_at',)

    # Automatically set the 'user' field to the logged-in admin user for non-superusers
    def save_model(self, request, obj, form, change):
        if not request.user.is_superuser:  # Non-superusers can't set 'user', assign logged-in user
            obj.user = request.user
        super().save_model(request, obj, form, change)

    # Filter blogs so that regular users only see blogs they created
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs  # Superuser can see all blogs
        return qs.filter(user=request.user)  # Regular admin users see only their own blogs

admin.site.register(Blog, BlogAdmin)
