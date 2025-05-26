const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const Course = require("./model/course.js");
const session = require("express-session");
const flash = require("connect-flash");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

const MongoURL =
  // "mongodb://127.0.0.1:27017/alhaseebinstitute";
  "mongodb+srv://noumansharifgul27:ZNOyvcs1YApA2TkE@nouman.laq4ja9.mongodb.net/?retryWrites=true&w=majority&appName=nouman"; //"mongodb://127.0.0.1:27017/alhaseebinstitute"

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(`DB_Error ----- ${err}`);
  });

async function main() {
  await mongoose.connect(MongoURL);
}

const sessionOptions = {
  secret: "secretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionOptions));
app.use(flash());
app.use((req, res, next) => {
  res.locals.errorMsg = req.flash("error");
  res.locals.successMsg = req.flash("success");
  next();
});

app.engine("ejs", ejsMate);

app.get("/", async (req, res) => {
  // res.send("Welcome to the root route!");
  const courses = await Course.find();

  // console.log(courses);
  res.render("index.ejs", { courses });
});

app.get("/courses/:id", async (req, res) => {
  const { id } = req.params;

  const course = await Course.findById(id);
  const allCourses = await Course.find();
  // res.send("Welcome to the course route!");
  // console.log(allCourses);
  res.render("course.ejs", { course, allCourses });
});

app.get("/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/new", async (req, res) => {
  const newCourse = Course.insertOne(req.body.course);

  await newCourse.save;
  console.log(newCourse);
  req.flash("success", "course created successfully");
  res.redirect("/");
});

app.get("/courses/:id/edit", async (req, res) => {
  const { password } = req.query;
  const { id } = req.params;
  if ((password = "noumansharfgul")) {
    const course = await Course.findById(id);
    res.render("edit.ejs", { course });
  } else {
    res.send("you dont have permtion to do that opration.");
  }
});

// Edit Route
app.post("/courses/:id", async (req, res) => {
  const { id } = req.params;
  const course = await Course.findByIdAndUpdate(id, req.body.course);
  await course.save;
  res.redirect(`/courses/${id}`);
});

// Plans route
app.get("/plans", (req, res) => {
  res.render("plans.ejs");
});

// Donation route
app.get("/donation", (req, res) => {
  res.render("donation.ejs");
});

// Free Trial
app.get("/freeTrial", (req, res) => {
  res.render("freeTrial.ejs");
});

// Post Form
app.post("/form", (req, res) => {
  const data = req.body.data;
  console.log(data);

  const transportar = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "alhaseebonlinequraninstitute@gmail.com",
      pass: "qfcz ubve gbci neqw",
    },
  });

  // User mail option
  const mailOptionsUser = {
    from: "alhaseebonlinequraninstitute@gmail.com",
    to: data.email,
    subject: `Thank you for submitting the form for ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; padding: 24px; background: #fafafa;">
        <h2 style="color: #1a5d2b; text-align: center;">Thank you for contacting Al Haseeb Institute!</h2>
        <p style="font-size: 1.1rem;">We have received your message. Here are the details you provided:</p>
        <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; font-weight: bold;">Name:</td>
            <td style="padding: 8px;">${data.name || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Email:</td>
            <td style="padding: 8px;">${data.email}</td>
          </tr>
          ${
            data.phone
              ? `
          <tr>
            <td style="padding: 8px; font-weight: bold;">Phone:</td>
            <td style="padding: 8px;">${data.phone}</td>
          </tr>
          `
              : ""
          }
          ${
            data.course
              ? `
          <tr>
            <td style="padding: 8px; font-weight: bold;">Interested Course:</td>
            <td style="padding: 8px;">${data.course}</td>
          </tr>
          `
              : ""
          }
          <tr>
            <td style="padding: 8px; font-weight: bold;">Subject:</td>
            <td style="padding: 8px;">${data.subject}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Message:</td>
            <td style="padding: 8px;">${data.message}</td>
          </tr>
        </table>
        <div style="text-align:center; margin-top: 2rem;">
          <a href="https://alhaseebquraninstitute.com/courses"
            style="display:inline-block;padding:1rem 1.5rem;background-color:#FFD700;color:#222;text-decoration:none;border-radius:6px;font-weight:bold;">
            View Courses
          </a>
        </div>
        <p style="margin-top: 2rem; text-align: center; color: #888;">We will get back to you soon, inshaAllah.</p>
      </div>
    `,
  };

  // Email to Al Haseeb Institute (admin)
  const mailOptionsAdmin = {
    from: "alhaseebonlinequraninstitute@gmail.com",
    to: "alhaseebonlinequraninstitute@gmail.com",
    subject: `New Form Submission: ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; padding: 28px; background: #f9fafb;">
        <h2 style="color: #1a5d2b; text-align: center; margin-bottom: 18px;">New Form Submission Received</h2>
        <table style="width: 100%; margin: 20px 0 28px 0; border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px #eee;">
          <tr style="background: #f3f6f9;">
          ${
            data.name
              ? `<td style="padding: 10px 12px; font-weight: bold; width: 40%;">Name:</td>
            <td style="padding: 10px 12px;">${data.name || "N/A"}</td>
            `
              : ""
          }
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: bold;">Email:</td>
            <td style="padding: 10px 12px;">${data.email}</td>
          </tr>
          ${
            data.number
              ? `
          <tr style="background: #f3f6f9;">
            <td style="padding: 10px 12px; font-weight: bold;">Phone:</td>
            <td style="padding: 10px 12px;">${data.phone}</td>
          </tr>
          `
              : ""
          }
          ${
            data.country
              ? `
          <tr>
            <td style="padding: 10px 12px; font-weight: bold;">Country:</td>
            <td style="padding: 10px 12px;">${data.country}</td>
          </tr>
          `
              : ""
          }
          ${
            data.courses
              ? `
          <tr style="background: #f3f6f9;">
            <td style="padding: 10px 12px; font-weight: bold;">Interested Course:</td>
            <td style="padding: 10px 12px;">${data.course}</td>
          </tr>
          `
              : ""
          }
          <tr>
            <td style="padding: 10px 12px; font-weight: bold;">Subject:</td>
            <td style="padding: 10px 12px;">${data.subject}</td>
          </tr>
          <tr style="background: #f3f6f9;">
           ${
             data.name
               ? `   <td style="padding: 10px 12px; font-weight: bold;">Message:</td>
            <td style="padding: 10px 12px;">${data.message}</td>
            `
               : ""
           }
          </tr>
        </table>
        <p style="margin-top: 2rem; text-align: center; color: #888;">This is an automated notification from your website form.</p>
      </div>
    `,
  };

  // Send both emails
  transportar.sendMail(mailOptionsUser, (error, info) => {
    if (error) {
      console.log(`Error sending mail to user: ${error}`);
      return res.redirect("/freeTrial");
    } else {
      transportar.sendMail(mailOptionsAdmin, (adminError, adminInfo) => {
        if (adminError) {
          console.log(`Error sending mail to admin: ${adminError}`);
        } else {
          console.log("Admin notification sent.");
        }
        return res.redirect("/freeTrial");
      });
    }
  });

  res.redirect("/freeTrial");
});

app.use("/", (req, res) => {
  res.render("error.ejs");
});

app.listen(PORT, () => {
  console.log(`App is listening at PORT: ${PORT}`);
});
