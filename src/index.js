import { program } from "commander";
import contactsApi from "./contacts.js";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsApi.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await contactsApi.getContactById(id);
      console.log(`contact with id: ${id}`, contact);
      break;

    case "add":
      const addedContact = await contactsApi.addContact(name, email, phone);
      console.log("added contact: ", addedContact);
      break;

    case "remove":
      const removedContact = await contactsApi.removeContact(id);
      console.log("removed contact", removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
