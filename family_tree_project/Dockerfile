FROM  python:3.10.9-bullseye

ENV PYTHONUNBUFFERED=1

WORKDIR /family_tree_project

RUN pip install -r requirements.txt

# copy from the current directory of the Dockerfile to /api in the image
COPY . .

RUN python manage.py collectstatic

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000", "--insecure"]

EXPOSE 8000