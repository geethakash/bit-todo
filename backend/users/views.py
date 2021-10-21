from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from .models import User
import jwt, datetime

# Create your views here.

class RegisterView(APIView):
    def  post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')
        
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrent password!')

        payload = {
            'id':user.id,
            'exp':datetime.datetime.utcnow() + datetime.timedelta(hours=720),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256').decode('utf-8')

        response = Response()
        
        response.set_cookie(key='jwt',value=token,httponly=True)
        response.data = ({
            'jwt':token,
            'detail':'success'
        })
        return response


class UserView(APIView):
   def post(self, request):
        # token = request.COOKIES.get('jwt')
        token = request.data['jwt']

        if not token:
            raise AuthenticationFailed('no token found!')

        try:
            payload = jwt.decode(token, 'secret', algorithm=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Session Expired!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response({"data":serializer.data,"detail":'success'})

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'detail':'Logout Successfuly!'
        }
        return response