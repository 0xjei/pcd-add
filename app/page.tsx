"use client"

import { constructPassportPcdProveAndAddRequestUrl } from "@pcd/passport-interface"
import { ArgumentTypeName } from "@pcd/pcd-types"
import { RSAPCDPackage } from "@pcd/rsa-pcd"
import styles from "./page.module.css"

const PCDPASS_URL = "https://zupass.org/"

async function addRSASignature() {
    const proofUrl = constructPassportPcdProveAndAddRequestUrl<typeof RSAPCDPackage>(
        PCDPASS_URL,
        window.location.origin + "/popup",
        RSAPCDPackage.name,
        {
            id: {
                argumentType: ArgumentTypeName.String,
                value: "1"
            },
            privateKey: {
                argumentType: ArgumentTypeName.String,
                value:
                    "-----BEGIN RSA PRIVATE KEY-----\n" +
                    "MIIBOQIBAAJAVY6quuzCwyOWzymJ7C4zXjeV/232wt2ZgJZ1kHzjI73wnhQ3WQcL\n" +
                    "DFCSoi2lPUW8/zspk0qWvPdtp6Jg5Lu7hwIDAQABAkBEws9mQahZ6r1mq2zEm3D/\n" +
                    "VM9BpV//xtd6p/G+eRCYBT2qshGx42ucdgZCYJptFoW+HEx/jtzWe74yK6jGIkWJ\n" +
                    "AiEAoNAMsPqwWwTyjDZCo9iKvfIQvd3MWnmtFmjiHoPtjx0CIQCIMypAEEkZuQUi\n" +
                    "pMoreJrOlLJWdc0bfhzNAJjxsTv/8wIgQG0ZqI3GubBxu9rBOAM5EoA4VNjXVigJ\n" +
                    "QEEk1jTkp8ECIQCHhsoq90mWM/p9L5cQzLDWkTYoPI49Ji+Iemi2T5MRqwIgQl07\n" +
                    "Es+KCn25OKXR/FJ5fu6A6A+MptABL3r8SEjlpLc=\n" +
                    "-----END RSA PRIVATE KEY-----"
            },
            signedMessage: {
                argumentType: ArgumentTypeName.String,
                value: "1"
            }
        },
        {
            title: "RSA Signature"
        }
    )

    // Popup window will redirect to the passport to request a proof.
    // Open the popup window under the current domain, let it redirect there.
    const popupUrl = `/popup?proofUrl=${encodeURIComponent(proofUrl)}`

    window.open(popupUrl, "_blank", "width=360,height=480,top=100,popup")
}

export default function Home() {
    return (
        <main className={styles.main}>
            <button onClick={addRSASignature}>Sign a message and add it to PCD pass</button>
        </main>
    )
}
