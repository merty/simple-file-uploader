# Simple File Uploader

[![Code Climate](https://codeclimate.com/github/merty/simple-file-uploader/badges/gpa.svg)](https://codeclimate.com/github/merty/simple-file-uploader)

Simple File Uploader is a file uploader written using HTML5 and Node.js. It can upload both to a local directory on the server or to an AWS S3 server.

Seeing that many people are actually interested in both HTML5 File API and Node.js, decided to write a simple file uploader application as many of the examples out there are a bit complicated for beginners. Hope this helps!

## Usage

1. Clone the repository or download and extract the files.
2. Install Node.js if you haven't already.
3. Go to the project directory.
4. Run the command `npm install` to install the dependencies.
4. Edit `config.js` if you wish to change the upload directory or use AWS S3.
5. Run the application using `npm start`.
6. Go to `http://<IP_ADDRESS>:<PORT>` where `<IP_ADDRESS>` is the IP address of the machine where the application is running and the `<PORT>` is the port number defined in `config.js` which is `8000` by default.
7. Drag and drop files to the marked area or click the text and select files to upload the files.

## Changelog

**0.2.0**

* Clicking the area now opens a file dialog to enable non-drag-and-drop uploads.
* Rewrote the parts that were using jQuery and removed jQuery from the project.
* Simplified the look and feel and made it small-screen-friendly.

**0.1.0**

* Initial release.

## License

This application is released under the MIT License. See the `LICENSE` file for details.
