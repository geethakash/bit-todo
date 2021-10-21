from json import load
from django.db import models
import json
from django.http.response import JsonResponse
from django.shortcuts import render
from .models import UserData

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed


import jwt
import datetime
# Create your views here.


class GetUserDataView(APIView):
    def post(self, request):
        # token = request.COOKIES.get('jwt')
        token = request.data['jwt']
        if not token:
            raise AuthenticationFailed('no token found!')

        try:
            payload = jwt.decode(token, 'secret', algorithm=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Session Expired!')
        userData = UserData.objects.get(user_id=payload['id']).dataJson
        # print(userData)
        # return JsonResponse({'data':"{}".format(userData)})

        response = Response()

        if (userData):
            response.data = ({
                "data": userData,
                "detail": "success",
                "message":"Login Successfully"
            })
            return response
        else:
            response.data = ({
                'detail': 'no user data found!'
            })
            return response


class SetUserDataView(APIView):
    def post(self, request):
        # token = request.COOKIES.get('jwt')
        token = request.data['jwt']
        data = request.data['userdata']

        if not token:
            raise AuthenticationFailed('no token found!')

        try:
            payload = jwt.decode(token, 'secret', algorithm=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Session Expired!')
        try:
            try:
                setUserData = UserData.objects.get(user=payload['id'])
                setUserData.Data = data
                setUserData.dataJson = data
                setUserData.save()
                return Response({"detail":'success',"message":"Updated Successfully!"})

            except:
                setUserData = UserData(
                    user_id=payload['id'],
                    Data=data,
                    dataJson=data
                )
                setUserData.save()
                return Response({"detail":'success',"message":"Creating new column!"})
        except:
            return Response({"detail":"failed"})
        
