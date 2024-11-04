document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form from submitting the default way

      var formData = new FormData(this);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            Swal.fire({
              title: "Thank you!",
              text: "Your message has been sent successfully. We will get back to you soon.",
              icon: "success",
            });
          } else {
            // popup.textContent = 'There was an error submitting the form: ' + data.message;
            Swal.fire({
              title: "Error!",
              text: "There was an error submitting the form: " + data.message,
              icon: "error",
            });
          }
          popup.style.display = "block";
        })
        .catch((error) => {
          var popup = document.getElementById("popup");
          popup.textContent =
            "There was an error submitting the form: " + error.message;
          popup.style.display = "block";
        });
    });
    var scrollToBottomBtn = document.getElementById("contact-btn");

    scrollToBottomBtn.addEventListener("click", function (event) {
      event.preventDefault();
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    });
  });

  
  // const form = document.querySelector("form");

  // const fullName = document.getElementById('name');
  // const email = document.getElementById('email');
  // const phone = document.getElementById('phone');
  // const subject = document.getElementById('subject');
  // const message = document.getElementById('mess');

  // function sendEmail() {
  //     const bodyMessage = `
  //         <h2>Contact Form MY portfolio Submission</h2>
  //         <p><strong>Full Name:</strong> ${fullName.value}</p>
  //         <p><strong>Email:</strong> ${email.value}</p>
  //         <p><strong>Phone Number:</strong> ${phone.value}</p>
  //         <p><strong>Message:</strong> ${message.value}</p>
  //     `;

  //     Email.send({
  //         Host: "smtp.elasticemail.com",
  //         Username: "niffzy.portfolio@gmail.com",
  //         Password: "1A9BC8EA812674A80D7EF8D02B948647D064",
  //         To: 'niffzy@gmail.com',
  //         From: "niffzy.portfolio@gmail.com",
  //         Subject: subject.value,
  //         Body: bodyMessage
  //     }).then(
  //         response => {
  //             console.log(response);
  //             // alert("Email sent successfully!");

  //             Swal.fire({
  //                 title: "Thank you!",
  //                 text: "Your message has been sent successfully. We will get back to you soon.",
  //                 icon: "success"
  //               });
  //         }
  //     ).catch(
  //         error => {
  //             console.error(error);
  //             alert("Failed to send email: " + error);
  //         }
  //     );
  // }

  // form.addEventListener("submit", (e) => {
  //     e.preventDefault();

  //     // Simple validation
  //     if (!fullName.value || !email.value || !phone.value || !subject.value || !message.value) {
  //         alert("Please fill out all required fields.");
  //         return;
  //     }

  //     sendEmail();
  // });



// icon navbar
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("bx-x"); // Toggle the 'bx-x' class on menuIcon
  navbar.classList.toggle("active"); // Toggle the 'active' class on the navbar
});

// scroll
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.addEventListener("scroll", () => {
  let fromTop = window.scrollY + 100; // Offset for fixed header

  sections.forEach((section) => {
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (
          section.getAttribute("id") === link.getAttribute("href").substring(1)
        ) {
          link.classList.add("active");
        }
      });

      section.classList.add("show-animate");
    } else {
      navLinks.forEach((link) => {
        if (
          section.getAttribute("id") === link.getAttribute("href").substring(1)
        ) {
          link.classList.remove("active");
        }
      });
      section.classList.remove("show-animate");
    }
  });

  // sticky header
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  menuIcon.classList.remove("bx-x"); // Toggle the 'bx-x' class on menuIcon
  navbar.classList.remove("active");
});

/*form////////////////////*/
// Following the twgl tiny tutorial, https://twgljs.org/
// Code adapted from https://github.com/greggman/twgl.js/blob/master/examples/tiny.html

const gl = document.getElementById("canvas").getContext("webgl");
const programInfo = twgl.createProgramInfo(gl, ["vertexShader", "fragmentShader"]);

const arrays = {
  position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
};
const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

let mouseX = 0, mouseY = 0;

document.getElementById("canvas").addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});


function render(time) {
  //Paints only 25% pixels in the screen space, 
  //Slightly lower resolution but much better performance!
  //See also: the zoom feature of https://glslsandbox.com/
  
  twgl.resizeCanvasToDisplaySize(gl.canvas, 0.5); 
  
  //Paints 4x the number of pixels.
  //Very computationally expensive in full screen on desktop devices
  //twgl.resizeCanvasToDisplaySize(gl.canvas, 1.0); 

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  const uniforms = {
    u_time: (time) * 0.002,
    u_resolution: [gl.canvas.width, gl.canvas.height],
    u_mouse: [mouseX, mouseY],
  };

  gl.useProgram(programInfo.program);
  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
  twgl.setUniforms(programInfo, uniforms);
  twgl.drawBufferInfo(gl, bufferInfo);

  requestAnimationFrame(render);
}
requestAnimationFrame(render);