import os, json
from .models import PersonData, Family, AccessRecord, UserProfileInfo
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.views.generic import TemplateView, ListView
from django.contrib.auth import get_user_model
from braces.views import SelectRelatedMixin

# Create your views here.

User = get_user_model()


class TreePage(LoginRequiredMixin, TemplateView):
    model = PersonData  # same as queryset = PersonData.objects.all(), use queryset for filtered objects
    template_name = os.path.join('family_tree', 'tree_page.html')
    context_object_name = 'PersonData'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        objects = [i for i in PersonData.objects.values()]
        keys_values = json.loads(json.dumps(objects), parse_int=str)
        data = json.dumps(keys_values)
        context['data'] = data
        return context


class TreeList(LoginRequiredMixin, SelectRelatedMixin, ListView):
    model = PersonData
    context_object_name = 'PersonData'
    template_name = os.path.join('family_tree', 'tree_list.html')
    select_related = ['family']


class ListFamilies(ListView):
    model = Family
    context_object_name = 'Family'
    template_name = os.path.join('family_tree', 'list_families.html')
