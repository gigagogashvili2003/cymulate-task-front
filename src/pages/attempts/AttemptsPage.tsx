import { Mail, Send, AlertTriangle, XCircle, FileText } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { CreateAttemptDto } from '@/services/attempts/types';
import { useMutation, useQuery } from 'react-query';
import { createAttempt, getAttempts, IAttempt } from '@/services/attempts/attempts.service';
import { toast } from 'react-toastify';

const AttemptsPage = () => {
    const { handleSubmit, reset, register } = useForm<CreateAttemptDto>();

    const { data: attempts, refetch } = useQuery('attempts', getAttempts);

    const { mutate } = useMutation(createAttempt, {
        onSuccess: () => {
            reset();
            refetch();
            toast.success("You've successfully sent an phising email!");
        },

        onError: (err: any) => {
            toast.error(err);
        },
    });

    const onSubmit = (data: CreateAttemptDto) => {
        mutate(data);
    };

    const getStatusBadge = (status: number) => {
        switch (status) {
            case 0:
                return (
                    <span className="flex items-center text-yellow-600">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Clicked
                    </span>
                );

            case 1:
                return (
                    <span className="flex items-center text-blue-600">
                        <XCircle className="w-4 h-4 mr-1" />
                        Not clicked
                    </span>
                );
            default:
                return <span className="flex items-center text-gray-600">Pending</span>;
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-2">Security Awareness Training Dashboard</h1>
                <p className="text-gray-600">Monitor and manage security awareness training campaigns</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Send Training Email</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="email"
                            {...register('receiver')}
                            placeholder="Enter employee email"
                            className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute top-3 left-3 pointer-events-none">
                            <FileText className="h-5 w-5 text-gray-400" />
                        </div>
                        <textarea
                            {...register('content')}
                            placeholder="Enter email content"
                            className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                    >
                        <Send className="w-4 h-4 mr-2" />
                        Send Training
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">Training Attempts</h2>
                </div>
                <div className="divide-y divide-gray-200">
                    {attempts?.body?.attempts.map((attempt: IAttempt) => (
                        <div key={attempt._id} className="px-6 py-4" title={`ID: ${attempt._id}`}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="font-bold">ID: {attempt._id}</h2>
                                    <h3 className="font-medium">Sender: {attempt.sender}</h3>
                                    <p className="text-sm text-gray-600">Receiver: {attempt.receiver}</p>
                                    <p className="text-sm text-gray-600">Content: {attempt.content}</p>
                                </div>

                                <div>{getStatusBadge(attempt.status)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AttemptsPage;
