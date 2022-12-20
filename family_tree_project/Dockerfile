FROM  python:3.10.9-bullseye

ENV PYTHONUNBUFFERED=1

WORKDIR /fadomily_tree_project

RUN pip install django django-cors-headers django-bootstrap-v5 djangorestframework djangorestframework-simplejwt

# copy from the current directory of the Dockerfile to /api in the image
COPY . .

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

EXPOSE 8000