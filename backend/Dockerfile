FROM python:3.9-slim-buster

WORKDIR /app

COPY ./requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

RUN gunicorn core.wsgi:application --bind 0.0.0.0:8000