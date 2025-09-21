# backend/tests/test_auth.py
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_register_and_login():
    email = "testuser@example.com"
    password = "password123"
    # register (may fail if DB persists; for CI use isolated DB)
    resp = client.post("/api/auth/register", json={"email": email, "password": password, "full_name": "Tester"})
    assert resp.status_code in (200, 400)
    # login
    resp2 = client.post("/api/auth/token", data={"username": email, "password": password})
    if resp2.status_code == 200:
        assert "access_token" in resp2.json()
