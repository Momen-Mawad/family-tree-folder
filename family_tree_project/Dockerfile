FROM  python:3.10.9-bullseye

ENV PYTHONUNBUFFERED=1

WORKDIR /family_tree_project

# copy from the current directory of the Dockerfile to /api in the image
COPY . .

RUN pip install -r requirements.txt

CMD ["python", "manage.py", "runserver", "0.0.0.0:443"]

EXPOSE 8000