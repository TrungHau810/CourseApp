from rest_framework.decorators import action
from rest_framework.response import Response
from courses import serializers, paginators
from rest_framework import viewsets, generics, status, parsers
from courses.models import Category, Course, Lesson, User, Comment, Like


class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Category.objects.filter(active=True)
    serializer_class = serializers.CategorySerializer


class CourseViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Course.objects.filter(active=True)  # Lấy các course có active là True
    serializer_class = serializers.CourseSerializer
    pagination_class = paginators.ItemPaginator

    def get_queryset(self):
        query = self.queryset  # query là danh sách courses

        q = self.request.query_params.get('q')  # Lấy giá trị param q trên URL
        if q:
            query = query.filter(subject__icontains=q)  # Lọc các course có field subject là q
        cate_id = self.request.query_params.get('category_id')  # Lấy giá trị trong category_id trên URL
        if cate_id:
            query = query.filter(category_id=cate_id)  # Lọc các course có field category_id là cate_id

        return query

    @action(methods=['get'], detail=True)
    def get_lesson(self, request, pk):
        lessons = self.get_object().lesson_set.filter(active=True)
        return Response(serializers.LessonSerializer(lessons, many=True).data, status=status.HTTP_200_OK)


class LessonViewSet(viewsets.ViewSet, generics.RetrieveAPIView):
    queryset = Lesson.objects.prefetch_related('tags').filter(active=True)
    serializer_class = serializers.LessonDetailSerializer

    @action(methods=['get'], detail=True, url_path='comments')
    def get_comments(self, request, pk):
        comments = self.get_object().comment_set.select_related('user').filter(active=True)

        return Response(serializers.CommentSerializer(comments, many=True).data, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = serializers.UserSerializer
    parser_classes = [parsers.MultiPartParser]
