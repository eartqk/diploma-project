# Use an official Python runtime as a parent image
FROM python:3.10-slim-buster

# Set the working directory to /app
WORKDIR /app

# Copy requirements.txt to the working directory
COPY requirements.txt .

# Install the dependencies
RUN apt-get update && apt-get -y install libpq-dev gcc

RUN pip install --no-cache-dir -r requirements.txt

# Copy the remaining application files to the working directory
COPY . .

# Open 8000 port
EXPOSE 8000

# Set the command to run when the container starts
CMD ["uvicorn", "sciencelink.app:app", "--host", "0.0.0.0", "--port", "8000"]