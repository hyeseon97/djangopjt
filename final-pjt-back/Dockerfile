# 베이스 이미지 설정
FROM python:3.10-slim

# 작업 디렉토리 설정
WORKDIR /app

# 환경 변수 설정
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# 의존성 파일 설치
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# 프로젝트 파일 복사
COPY . /app/

# 포트 설정
EXPOSE 8080

# Django 앱 실행
CMD ["python", "manage.py", "runserver", "0.0.0.0:8080"]
