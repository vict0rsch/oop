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


class MediaAdmin(admin.ModelAdmin):
    list_display = ('name', 'website', 'wiki', 'long_name',)
    # date_hierarchy = 'date'
    ordering = ('name', 'website')
    search_fields = ('name', 'website', 'wiki', 'long_name')

admin.site.register(Media, MediaAdmin)


class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'website', 'wiki', 'long_name',)
    # date_hierarchy = 'date'
    ordering = ('name', 'website')
    search_fields = ('name', 'website', 'wiki', 'long_name')

admin.site.register(Company, CompanyAdmin)


class IndividualAdmin(admin.ModelAdmin):
    list_display = ('name', 'website', 'wiki', 'long_name', 'other_groups', )
    # date_hierarchy = 'date'
    ordering = ('name', 'website',)
    search_fields = ('name', 'website', 'wiki', 'long_name')

admin.site.register(Individual, IndividualAdmin)


class UserAdmin(admin.ModelAdmin):
    list_display = ('pseudo', 'email')
    list_filter = ('pseudo',)
    # date_hierarchy = 'date'
    ordering = ('pseudo', )
    search_fields = ('pseudo', 'email')
admin.site.register(User, UserAdmin)


class ShareAdmin(admin.ModelAdmin):
    list_display = ('share', 'display_child', 'display_parent')
    # list_filter = ('parent',)
    # date_hierarchy = 'date'
    ordering = ('share', 'display_child', 'display_parent')
    search_fields = ('display_child', 'display_parent')

    def display_child(self, obj):
        id = obj.child_object_id
        if isinstance(obj.child, Media):
            return Media.objects.get(id=id).name
        elif isinstance(obj.child, Individual):
            return Individual.objects.get(id=id).name
        elif isinstance(obj.child, Company):
            return Company.objects.get(id=id).name
        else:
            return 'ERROR'
    display_child.short_description = 'Owned'

    def display_parent(self, obj):
        id = obj.parent_object_id
        if isinstance(obj.parent, Media):
            return Media.objects.get(id=id).name
        elif isinstance(obj.parent, Individual):
            return Individual.objects.get(id=id).name
        elif isinstance(obj.parent, Company):
            return Company.objects.get(id=id).name
        else:
            return 'ERROR'
    display_parent.short_description = 'Owner'



class ShareForm(forms.ModelForm):

    def child_field = CustomModelChoiceField(queryset=)

    class Meta:
        model = Share



class CustomModelChoiceField(forms.ModelChoiceField):
     def label_from_instance(self, obj):
         return obj.name

admin.site.register(Share, ShareAdmin)


class VisitAdmin(admin.ModelAdmin):
    list_display = ('media', 'user', 'date')
    list_filter = ('media', 'user', 'date')
    # date_hierarchy = 'date'
    ordering = ('media', 'user', 'date')
    search_fields = ('media', 'user')
admin.site.register(Visit, VisitAdmin)
