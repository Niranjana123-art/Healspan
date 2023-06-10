from django.urls import include, path
from rest_framework import routers
from .views import PatientViewSet

router = routers.DefaultRouter()
router.register('patients', PatientViewSet)

urlpatterns = [
    path('patients/', PatientViewSet.as_view({'get': 'list'}), name='patient-list'),

    # ... other URL patterns
]
