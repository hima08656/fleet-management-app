# Fleet Management App

A simple Fleet Management web application built with **HTML, CSS, and JavaScript**.  
This project was developed as part of an assignment to demonstrate core functionality, validation, and UI rendering.

---

## 🚀 Features

### 1. Login Page (`index.html`)
- Email and password inputs.
- Valid credentials:
  - **Email:** `admin@gmail.com`
  - **Password:** `admin1234`
- On success → alert message + redirect to `admin.html`.
- On failure → alert message: "Wrong email or password".

### 2. Admin Dashboard (`admin.html`)
- **Navbar Filters:**
  - Category filter (All, Auto, Car, Truck, Bus).
  - Availability filter (All, Available, Unavailable).
  - Clear Filter button resets filters.

- **Sidebar Form:**
  - Fields: Reg No, Category, Driver Name, Availability.
  - Validates required fields.
  - Clears form after successful submission.
  - Prevents duplicate Reg No (optional).

- **Fleet Cards (Main Content):**
  - Each card displays:
    - Reg No
    - Category
    - Driver Name
    - Availability Status
    - Vehicle Image
  - Actions:
    - **Update Driver:** Uses `prompt()`, rejects empty input.
    - **Change Availability:** Toggles instantly between Available/Unavailable.
    - **Delete Vehicle:** Uses `confirm()`, deletes only if confirmed.

---

## 🧪 Edge Cases & Validation
- Required fields cannot be empty.
- Driver name cannot be blank or whitespace.
- Delete action always asks for confirmation.
- Filters can be combined (e.g., show only Available Cars).
- Clear Filter resets to show all vehicles.

---

## 📂 Project Structure

