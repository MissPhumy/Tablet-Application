# Tablet Application for Traceability System

This application displays real-time results from the traceability process by scanning images, sending them to a machine learning model via API, and updating or verifying the results back to another API.
## Features
- Image scanning for traceability
- Integration with a machine learning model via API
- Real-time result display for operator validation
- User-friendly interface for quick verification

## Technology Stack
- **Python** (Backend)
- **Django** (Web Framework)
- **JavaScript** (Frontend)
- **HTML & Bootstrap** (UI)
- **Raspberry Pi** (Hardware integration)
- **EfficientNet B0** (ML model)

## Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MissPhumy/Tablet-Application.git
   cd Tablet-Application
   ```
2.  Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Configure environment variables (e.g., API keys, database settings).
4. Run the application:
   ```bash
    python manage.py runserver
   ```

##  Usage
- Real-time API results displays and data review, update, or verifocation.
- Verified results storage for future reference or further processing.

## Contributing
Feel free to submit issues or pull requests if you have suggestions or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
