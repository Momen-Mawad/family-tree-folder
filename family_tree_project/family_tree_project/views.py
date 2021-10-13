from django.views.generic import TemplateView
# Create your views here.


class Index(TemplateView):
    template_name = 'index.html'


class ContactPage(TemplateView):
    template_name = 'contact_page.html'


class AboutPage(TemplateView):
    template_name = 'about_page.html'


class TestPage(TemplateView):
    template_name = 'test.html'
