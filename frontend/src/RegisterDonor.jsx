import React, { useState } from "react";
import {
  CheckCircle2,
  Droplet,
  UserPlus,
  QrCode,
  Barcode as BarcodeIcon,
  Printer,
  RotateCcw,
} from "lucide-react";

import { QRCodeSVG } from "qrcode.react";
import Barcode from "react-barcode";

import { api, groups } from "./api";
import Sidebar from "./Sidebar";
import Header from "./Header";

import "./Layout.css";
import "./RegisterDonor.css";


const initial = {
  name: "",
  age: "",
  gender: "",
  phone: "",
  bloodGroup: "",
};


export default function RegisterDonor() {

  const [form, setForm] = useState(initial);

  const [result, setResult] = useState(null);

  const [error, setError] = useState("");

  const [saving, setSaving] = useState(false);


  /* =====================================
     INPUT CHANGE
  ===================================== */

  function change(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  }


  /* =====================================
     REGISTER DONOR
  ===================================== */

  async function submit(e) {

    e.preventDefault();

    setError("");

    setSaving(true);


    try {

      const data = await api("/donors", {
        method: "POST",

        body: JSON.stringify({
          ...form,
          age: Number(form.age),
        }),
      });


      console.log("Donation registered:", data);

      setResult(data);

    } catch (err) {

      console.error(err);

      setError(
        err.message || "Unable to register donor"
      );

    } finally {

      setSaving(false);

    }

  }


  /* =====================================
     CLEAR FORM
  ===================================== */

  function clearForm() {

    setForm(initial);

    setError("");

  }


  /* =====================================
     REGISTER ANOTHER
  ===================================== */

  function registerAnother() {

    setResult(null);

    setForm(initial);

    setError("");

  }


  /* =====================================
     PRINT QR + BARCODE
  ===================================== */

  function printCodes() {

    window.print();

  }


  /* ==========================================================
     SUCCESS PAGE
  ========================================================== */

  if (result) {

    const donor = result.donor;

    const unit = result.unit;


    /*
      QR CODE DATA

      QR scan பண்ணும்போது இந்த information
      கிடைக்கும்.
    */

    const qrData = JSON.stringify({

      donorCode: donor.donorCode,

      unitCode: unit.unitCode,

      name: donor.name,

      age: donor.age,

      gender: donor.gender,

      phone: donor.phone,

      bloodGroup: unit.bloodGroup,

      collectedOn: unit.collectedOn,

      expiryDate: unit.expiryDate,

    });


    return (

      <div className="app-shell">

        {/* ================= SIDEBAR ================= */}

        <Sidebar />


        {/* ================= MAIN ================= */}

        <main className="page">

          <Header
            title="Donation registered"
            subtitle="The donor and blood unit were successfully created."
          />


          {/* ================= SUCCESS CARD ================= */}

          <section className="donor-success card">


            {/* SUCCESS ICON */}

            <div className="success-circle">

              <CheckCircle2 size={34} />

            </div>


            <h2>
              Donation recorded
            </h2>


            <p className="success-text">
              Keep these details for the donor and
              blood-unit record.
            </p>


            {/* ================= DONOR DETAILS ================= */}

            <div className="result-grid">


              {/* DONOR CODE */}

              <div className="result-box">

                <span>
                  DONOR CODE
                </span>

                <strong>
                  {donor.donorCode}
                </strong>

              </div>


              {/* UNIT CODE */}

              <div className="result-box">

                <span>
                  UNIT CODE
                </span>

                <strong>
                  {unit.unitCode}
                </strong>

              </div>


              {/* BLOOD GROUP */}

              <div className="result-box">

                <span>
                  BLOOD GROUP
                </span>

                <strong className="blood-result">
                  {unit.bloodGroup}
                </strong>

              </div>


              {/* EXPIRY */}

              <div className="result-box">

                <span>
                  EXPIRY DATE
                </span>

                <strong>
                  {unit.expiryDate}
                </strong>

              </div>


            </div>


            {/* ==================================================
                QR + BARCODE
            ================================================== */}

            <div className="code-section">


              {/* ================= QR CODE ================= */}

              <div className="code-card">


                <div className="code-heading">

                  <div className="code-icon qr-icon">

                    <QrCode size={22} />

                  </div>


                  <div>

                    <h3>
                      Donor QR Code
                    </h3>

                    <p>
                      Scan for donor details
                    </p>

                  </div>

                </div>


                {/* QR */}

                <div className="qr-container">

                  <QRCodeSVG

                    value={qrData}

                    size={190}

                    level="H"

                    includeMargin={true}

                  />

                </div>


                <div className="code-value">

                  {donor.donorCode}

                </div>


                <span className="code-help">

                  Scan this QR code to view
                  donation information

                </span>


              </div>



              {/* ================= BARCODE ================= */}

              <div className="code-card">


                <div className="code-heading">

                  <div className="code-icon barcode-icon">

                    <BarcodeIcon size={22} />

                  </div>


                  <div>

                    <h3>
                      Blood Unit Barcode
                    </h3>

                    <p>
                      Blood unit identification
                    </p>

                  </div>

                </div>


                {/* BARCODE */}

                <div className="barcode-container">

                  <Barcode

                    value={unit.unitCode}

                    format="CODE128"

                    width={2.2}

                    height={80}

                    displayValue={true}

                    margin={10}

                    background="#ffffff"

                    lineColor="#20252b"

                  />

                </div>


                <div className="code-value">

                  {unit.unitCode}

                </div>


                <span className="code-help">

                  Use this barcode for blood-unit
                  scanning

                </span>


              </div>


            </div>


            {/* ================= ACTION BUTTONS ================= */}

            <div className="success-actions">


              <button

                type="button"

                className="secondary-btn"

                onClick={registerAnother}

              >

                <RotateCcw size={17} />

                Register another donor

              </button>


              <button

                type="button"

                className="primary-btn"

                onClick={printCodes}

              >

                <Printer size={17} />

                Print QR & Barcode

              </button>


            </div>


          </section>

        </main>

      </div>

    );

  }


  /* ==========================================================
     REGISTER DONOR FORM
  ========================================================== */

  return (

    <div className="app-shell">


      {/* ================= SIDEBAR ================= */}

      <Sidebar />


      {/* ================= MAIN ================= */}

      <main className="page">


        <Header

          title="Register donor"

          subtitle="Record a new donor and create a blood unit."

        />


        {/* ================= FORM ================= */}

        <form

          className="donor-form card"

          onSubmit={submit}

        >


          {/* FORM TITLE */}

          <div className="form-title">


            <div className="form-icon">

              <UserPlus size={24} />

            </div>


            <div>

              <h2>
                Donor details
              </h2>

              <p>
                Enter the donor information collected
                at the desk.
              </p>

            </div>


          </div>


          {/* ================= INPUT GRID ================= */}

          <div className="donor-grid">


            {/* NAME */}

            <label>

              Full name

              <input

                name="name"

                type="text"

                required

                value={form.name}

                onChange={change}

                placeholder="e.g. Arun Kumar"

              />

            </label>


            {/* AGE */}

            <label>

              Age

              <input

                name="age"

                type="number"

                min="18"

                max="70"

                required

                value={form.age}

                onChange={change}

                placeholder="25"

              />

            </label>


            {/* GENDER */}

            <label>

              Gender

              <select

                name="gender"

                required

                value={form.gender}

                onChange={change}

              >

                <option value="">
                  Select gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </label>


            {/* PHONE */}

            <label>

              Phone number

              <input

                name="phone"

                type="tel"

                required

                value={form.phone}

                onChange={change}

                placeholder="+91 98765 43210"

              />

            </label>


            {/* BLOOD GROUP */}

            <label>

              Blood group

              <select

                name="bloodGroup"

                required

                value={form.bloodGroup}

                onChange={change}

              >

                <option value="">
                  Select blood group
                </option>


                {groups.map((group) => (

                  <option
                    key={group}
                    value={group}
                  >
                    {group}
                  </option>

                ))}


              </select>

            </label>


          </div>


          {/* ================= INFO ================= */}

          <div className="donor-info">


            <div className="info-icon">

              <Droplet size={21} />

            </div>


            <div>

              <strong>
                Automatic blood-unit creation
              </strong>

              <span>
                After registration, the system automatically
                creates a unique donor code and blood-unit
                code with the collection and expiry dates.
              </span>

            </div>


          </div>


          {/* ================= ERROR ================= */}

          {error && (

            <div className="page-error">

              {error}

            </div>

          )}


          {/* ================= ACTIONS ================= */}

          <div className="form-actions">


            <button

              type="button"

              className="secondary-btn"

              onClick={clearForm}

            >

              Clear

            </button>


            <button

              type="submit"

              className="primary-btn"

              disabled={saving}

            >

              {saving
                ? "Saving..."
                : "Save donation →"
              }

            </button>


          </div>


        </form>

      </main>

    </div>

  );

}