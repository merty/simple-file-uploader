Simple File Uploader
===

[![Code Climate](https://codeclimate.com/github/merty/simple-file-uploader/badges/gpa.svg)](https://codeclimate.com/github/merty/simple-file-uploader)

Simple File Uploader is a file uploader written using HTML5 and Node.js. It can upload both to a local directory on the server or to an AWS S3 server.

Clearly, it is not a revolutionary file uploader that will change the way mankind upload their files. Seeing that many people are actually interested in both HTML5 File API and Node.js, decided to write a simple file uploader application as many of the examples out there are not clear enough for beginners. Hope this helps!

Usage
---

1. Clone the repository or download and extract the files.
2. Install Node.js if you haven't already.
3. Go to the directory where index.js etc. are.
4. Edit config.js if you wish to change the upload directory or the port number.
5. Run the application using `node index.js`
6. Go to `http://<IP_ADDRESS>:<PORT>` where `<IP_ADDRESS>` is the IP address of the machine where the application is running and the `<PORT>` is the port number defined in `config.js` which is `8000` by default.
7. Drag and drop files to the marked area to upload the files to the `upload_dir` defined in `config.js`.

**To use with AWS S3:**

1. Install knox using `npm install knox`.
2. Edit config.js to fill in the values for the keys `key`, `secret` and `bucket`, and replace the last line with `exports.s3_enabled = true;`.

License
---

This application is released under the MIT License. See the `LICENSE` file for details.
