from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from core.models import Category
from core.serializers import CategorySerializer



@api_view(['GET'])
def getCategories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getCategory(request, pk):
    category = Category.objects.get(id=pk)
    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createCategory(request):
    user = request.user
    data = request.data

    category = Category.objects.create(
        user=user,
        name=data['name'],
    )

    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateCategory(request, pk):
    data = request.data
    category = Category.objects.get(id=pk)

    category.name = data['name']

    category.save()

    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteCategory(request, pk):
    category = Category.objects.get(id=pk)
    category.delete()
    return Response('Category Deleted')