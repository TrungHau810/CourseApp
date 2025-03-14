from django.contrib import admin
from courses.models import Category, Course, Lesson, Tag, Comment, Like
from django.utils.html import mark_safe
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget


class LessonForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorUploadingWidget)
    class Meta:
        model = Lesson
        fields = '__all__'


class MyCourseAdmin(admin.ModelAdmin):
    list_display = ['id', 'subject', 'created_date','active', 'category']
    search_fields = ['subject']
    list_filter = ['id', 'created_date']
    readonly_fields = ['image_view']

    def image_view(self, course):
        return mark_safe(f"<img src='/static/{course.image.name}' width=200 />")

class MyLessonAdmin(admin.ModelAdmin):
    form = LessonForm
    # list_display = ['id', 'subject', 'course']


class CourseAppAdminSite(admin.AdminSite):
    site_header = 'Hệ thống khoá học trực tuyến'


admin_site = CourseAppAdminSite(name='myadmin')


admin_site.register(Category)
admin_site.register(Course, MyCourseAdmin)
admin_site.register(Lesson, MyLessonAdmin)
admin_site.register(Tag)
admin_site.register(Comment)