import { promises as fs } from "fs";
import path from "path";

async function listContacts() {
  const data = await fs
    .readFile(
      "D:/Users/Yarei/Desktop/homeworks/goit-node-cli/src/db/contacts.json"
    )
    .then((bufferedData) => JSON.parse(bufferedData.toString()))
    .catch((error) => console.log("error", error));

  return data;
}

async function getContactById(contactId) {
  const data = await fs
    .readFile(
      "D:/Users/Yarei/Desktop/homeworks/goit-node-cli/src/db/contacts.json"
    )
    .then((bufferedData) => JSON.parse(bufferedData.toString()))
    .catch((error) => console.log("error", error));

  const foundData = data.find((contact) => contact.id === contactId);
  if (foundData) {
    return foundData;
  } else {
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs
      .readFile(
        "D:/Users/Yarei/Desktop/homeworks/goit-node-cli/src/db/contacts.json"
      )
      .then((bufferedData) => JSON.parse(bufferedData.toString()))
      .catch((error) => console.log("error of parsing data", error));

    const filteredData = data.filter((contact) => contact.id !== contactId);

    try {
      fs.writeFile(
        "D:/Users/Yarei/Desktop/homeworks/goit-node-cli/src/db/contacts.json",
        JSON.stringify(filteredData)
      );
    } catch (error) {
      console.log("error of writing file", error);
    }
    return data.find((contact) => contact.id === contactId)
      ? data.find((contact) => contact.id === contactId)
      : null;
  } catch (error) {
    console.log("error", error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs
      .readFile(
        "D:/Users/Yarei/Desktop/homeworks/goit-node-cli/src/db/contacts.json"
      )
      .then((bufferedData) => JSON.parse(bufferedData.toString()))
      .catch((error) => console.log("error of parsing data", error));

    const quantityOfContacts = data.length;

    try {
      fs.writeFile(
        "D:/Users/Yarei/Desktop/homeworks/goit-node-cli/src/db/contacts.json",
        JSON.stringify([
          ...data,
          {
            id: `${quantityOfContacts + 1}`,
            name,
            email,
            phone,
          },
        ])
      );
      return {
        id: `${quantityOfContacts + 1}`,
        name,
        email,
        phone,
      };
    } catch (error) {
      console.log("error of writing file", error);
    }
  } catch (error) {
    console.log("error", error);
  }
}

export default { listContacts, getContactById, removeContact, addContact };
