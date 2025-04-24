# Project Setup Guide

This guide provides instructions to set up and run the project.

## Prerequisites

- [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager)

## Installation

1. **Install Node.js 22 using nvm**

   ```bash
   nvm install 22
   nvm use 22
   ```

2. **Install pnpm**

   ```bash
   npm install -g pnpm
   ```

3. **Install project dependencies**

   ```bash
   pnpm install
   ```

## Running the Services

- **Start the Web API service**

   ```bash
   pnpm run web-api
   ```

- **Start the Admin API service**

   ```bash
   pnpm run admin-api
   ```