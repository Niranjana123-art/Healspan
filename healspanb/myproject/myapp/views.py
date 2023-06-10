from rest_framework import viewsets
from .models import Patient
from .serializers import PatientSerializer

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


    def get_queryset(self):
        queryset = super().get_queryset()

        # Get selected filters from request query parameters
        selected_filters = self.request.query_params.get('selectedFilters')

        if selected_filters:
            filters = selected_filters.split(',')

            # Apply filters to the queryset
            for filter in filters:
                label, subfilter = filter.split(':')
                queryset = queryset.filter(**{label: subfilter})

        return queryset
