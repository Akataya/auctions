from django.contrib.auth.models import User
from .serializers import UserSerializer, RegisterUserSerializer, LoginSerializer
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from .permissions import IsAccountOwnerOrReadOnly
from django.contrib.auth import login as django_login, logout as django_logout


class UserViewSet(viewsets.ModelViewSet):
    # List, create, retrieve, update, partial_update, destroy
    # queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsAccountOwnerOrReadOnly)

    def list(self, request):
        queryset = User.objects.all()
        data = UserSerializer(queryset, many=True).data
        return Response(data)

    def create(self, request, *args, **kwargs):
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)