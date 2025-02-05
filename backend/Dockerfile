# Use official Python image as base
FROM python:3.11

# Set the working directory in the container
WORKDIR /backend

# Copy the backend code into the container
COPY . /backend

# Install dependencies globally (no venv)
RUN pip install --upgrade pip \
    && pip install -r requirements.txt
RUN pip install uvicorn


# Expose the FastAPI port
EXPOSE 8000

# Command to run the backend
CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]



# # Stage 1: Build stage
# FROM python:3.11 AS builder

# WORKDIR /backend

# COPY requirements.txt .
# RUN pip install --upgrade pip \
#     && pip install --no-cache-dir -r requirements.txt

# # Stage 2: Final stage
# FROM python:3.11

# WORKDIR /backend

# COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
# COPY . .

# EXPOSE 8000

# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
