#!/bin/bash

# Start frontend
cd /MERNBOT_frontend
npm run dev &

# Start backend
cd /MERNBOT_backend
npm run dev