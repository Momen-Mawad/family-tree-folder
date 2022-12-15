FROM  python:3.8.13-bullseye

ENV PYTHONUNBUFFERED=1

WORKDIR /family_tree_project

RUN pip install django django-cors-headers django-bootstrap-v5 djangorestframework djangorestframework-simplejwt

# copy from the current directory of the Dockerfile to /api in the image
COPY .. .

EXPOSE 8000