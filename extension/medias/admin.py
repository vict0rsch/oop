from django.contrib import admin
from medias.models import *
from django import forms


class EntityAdmin(admin.ModelAdmin):
    list_display = ('name', 'website', 'wiki',
                    'category', 'long_name', 'other_groups', )
    list_filter = ('category',)
    # date_hierarchy = 'date'
    ordering = ('name', 'website', 'category')
    search_fields = ('name', 'website', 'wiki', 'category', 'long_name')

admin.site.register(Entity, EntityAdmin)


class UserAdmin(admin.ModelAdmin):
    list_display = ('pseudo', 'email')
    list_filter = ('pseudo',)
    # date_hierarchy = 'date'
    ordering = ('pseudo', )
    search_fields = ('pseudo', 'email')
admin.site.register(User, UserAdmin)


class ShareAdmin(admin.ModelAdmin):
    list_display = ('share', 'parent', 'child', 'special')
    fields = ('parent', 'share', 'child', 'special')
    search_fields = ('child__name', 'parent__name')
    ordering = ['parent__name', 'share', 'child__name']
admin.site.register(Share, ShareAdmin)


class VisitAdmin(admin.ModelAdmin):
    list_display = ('media', 'user', 'date')
    list_filter = ('media', 'user', 'date')
    # date_hierarchy = 'date'
    ordering = ('media', 'user', 'date')
    search_fields = ('media', 'user')
admin.site.register(Visit, VisitAdmin)
