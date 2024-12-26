import { useState } from 'react';
import { Mail, Send, AlertTriangle, CheckCircle, XCircle, FileText } from 'lucide-react';
import useAuthStore from '@/store/useAuthStore';

const AttemptsPage = () => {
    const { user } = useAuthStore();

    const [email, setEmail] = useState('');
    const [emailContent, setEmailContent] = useState('');
    const [trainingAttempts, setTrainingAttempts] = useState([
        {
            id: 1,
            employeeEmail: 'john.doe@company.com',
            emailContent: 'IT Security Update Required',
            status: 'clicked', // clicked, ignored, reported
            sentAt: '2024-12-25T10:00:00',
        },
        {
            id: 2,
            employeeEmail: 'jane.smith@company.com',
            emailContent: 'Urgent: Password Reset Required',
            status: 'reported',
            sentAt: '2024-12-24T15:30:00',
        },
    ]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const newAttempt = {
            id: trainingAttempts.length + 1,
            employeeEmail: email,
            emailContent: emailContent,
            status: 'pending',
            sentAt: new Date().toISOString(),
        };
        setTrainingAttempts([newAttempt, ...trainingAttempts]);
        setEmail('');
        setEmailContent('');
    };

    const getStatusBadge = (status: any) => {
        switch (status) {
            case 'clicked':
                return (
                    <span className="flex items-center text-yellow-600">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Clicked
                    </span>
                );
            case 'reported':
                return (
                    <span className="flex items-center text-green-600">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Reported
                    </span>
                );
            case 'ignored':
                return (
                    <span className="flex items-center text-blue-600">
                        <XCircle className="w-4 h-4 mr-1" />
                        Ignored
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

            {/* Training Email Form */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Send Training Email</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter employee email"
                            className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Email Content Input */}
                    <div className="relative">
                        <div className="absolute top-3 left-3 pointer-events-none">
                            <FileText className="h-5 w-5 text-gray-400" />
                        </div>
                        <textarea
                            value={emailContent}
                            onChange={(e) => setEmailContent(e.target.value)}
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

            {/* Training Attempts List */}
            <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">Training Attempts</h2>
                </div>
                <div className="divide-y divide-gray-200">
                    {trainingAttempts.map((attempt) => (
                        <div key={attempt.id} className="px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium">{attempt.employeeEmail}</h3>
                                    <p className="text-sm text-gray-600">{attempt.emailContent}</p>
                                    <p className="text-xs text-gray-500">
                                        Sent: {new Date(attempt.sentAt).toLocaleString()}
                                    </p>
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
