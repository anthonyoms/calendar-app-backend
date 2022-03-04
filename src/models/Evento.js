import { Schema, model } from "mongoose";

const EventoSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    //Relacion en mongo
    user: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

EventoSchema.method("toJSON", function () {
  const { _id, ...event } = this.toObject();
  event.id = _id;
  return event;
});

export default model("Evento", EventoSchema);
