import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
    identifier: { type: String, required: true },
    sessionToken: { type: String, required: true },
    hour: { type: String, required: true },
    activeSession: { type: Boolean, required: true }
});

export const LogModel = mongoose.model('Logs', LogSchema);

export const getLogs = () => LogModel.find();
export const getLogById = (id: string) => LogModel.findById({id});
export const createLog = (values: Record<string, any>) => new LogModel(values).save().then((log) => log.toObject());
export const deleteLogById = (id: string) => LogModel.findByIdAndDelete({ _id: id });
export const updateLogById = (id: string, values: Record<string, any>) => LogModel.findByIdAndUpdate(id, values);
