#!/bin/bash
cd /Users/hussain/Desktop/BC-frontend/backend
export JAVA_HOME=/opt/homebrew/opt/openjdk@17
export DATABASE_URL="jdbc:postgresql://aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres?sslmode=require"
export DATABASE_USERNAME="postgres.ajqaqxukubkodrtsbjsk"
export DATABASE_PASSWORD="march2006@"
export JWT_SECRET="MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI="
export CORS_ORIGINS="http://localhost:3000,http://localhost:5173"
mvn spring-boot:run
