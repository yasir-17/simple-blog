from django.urls import path
from .views import BlogPostList, BlogPostDetail, CommentList

urlpatterns = [
    path('posts/', BlogPostList.as_view(), name='post-list'),
    path('posts/<int:pk>/', BlogPostDetail.as_view(), name='post-detail'),
    path('posts/<int:post_id>/comments/', CommentList.as_view(), name='comment-list'),
]
