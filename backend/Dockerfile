FROM python:3.9-slim-buster

# Setup and activate virtual python environment 
ENV VIRTUAL_ENV=/opt/.venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Working Directory
WORKDIR /app

# Copy requirements.txt
COPY backend/requirements.txt requirements.txt

# Install packages from requirements.txt
# hadolint ignore=DL3013
RUN pip install --upgrade pip &&\
    pip install --trusted-host pypi.python.org --no-cache-dir -r requirements.txt

# Copy source code to working directory
COPY . backend/app.py /app/

EXPOSE 5000
ENV FLASK_APP=app.py
CMD ["flask", "run", "--host", "0.0.0.0"]