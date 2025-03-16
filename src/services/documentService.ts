import { toast } from "sonner";

export interface DocumentAnalysis {
  simplifiedExplanation: string;
  keyPoints: {
    title: string;
    description: string;
    highlight?: boolean;
  }[];
  arabicSummary: string;
  documentType: string;
  caseTimeline: {
    date: string;
    title: string;
    description: string;
  }[];
  parties: {
    name: string;
    type: string;
    role: string;
  }[];
  documentMetrics: {
    totalPages: number;
    filePages: number;
    exhibits: number;
    citations: number;
    dates: number;
  };
}

export const processDocument = async (file: File): Promise<DocumentAnalysis> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock response data
  let mockAnalysis: DocumentAnalysis = {
    simplifiedExplanation: 
      "This court document is a Motion for Summary Judgment filed by the defendant (ABC Corporation) against the plaintiff (John Smith).\n\n" +
      "In simple terms, the defendant is asking the court to make a decision on the case without a full trial because they believe there are no important facts in dispute.\n\n" +
      "The defendant argues that the plaintiff's case should be dismissed because: (1) the statute of limitations has expired, meaning the plaintiff waited too long to file the lawsuit; (2) the plaintiff signed a release agreement, giving up their right to sue; and (3) there is no evidence that the defendant's actions caused the plaintiff's alleged injuries.\n\n" +
      "The document includes references to previous court cases that support the defendant's arguments and several exhibits including the signed release agreement, medical records, and witness statements.\n\n" +
      "If the court grants this motion, the case will be dismissed without going to trial. If denied, the case will proceed to trial where all evidence will be presented and examined in detail.",
    
    keyPoints: [
      {
        title: "Document Type",
        description: "Motion for Summary Judgment filed by the defendant ABC Corporation",
        highlight: true
      },
      {
        title: "Main Argument",
        description: "Defendant claims there are no genuine issues of material fact and they are entitled to judgment as a matter of law"
      },
      {
        title: "Legal Grounds",
        description: "Statute of limitations, signed release agreement, and lack of causation evidence"
      },
      {
        title: "Case Status",
        description: "Pending court decision on this motion",
        highlight: true
      },
      {
        title: "Filing Date",
        description: "January 15, 2023"
      }
    ],
    
    arabicSummary:
      "هذه الوثيقة القضائية هي طلب للحكم الموجز مقدم من المدعى عليه (شركة ABC) ضد المدعي (جون سميث).\n\n" +
      "بعبارات بسيطة، يطلب المدعى عليه من المحكمة اتخاذ قرار بشأن القضية دون محاكمة كاملة لأنهم يعتقدون أنه لا توجد حقائق مهمة متنازع عليها.\n\n" +
      "يجادل المدعى عليه بأنه يجب رفض قضية المدعي للأسباب التالية: (1) انتهت مدة التقادم، مما يعني أن المدعي انتظر وقتًا طويلاً لرفع الدعوى؛ (2) وقع المدعي اتفاقية إبراء، متنازلاً عن حقه في رفع دعوى قضائية؛ و (3) لا يوجد دليل على أن أفعال المدعى عليه تسببت في الإصابات المزعومة للمدعي.\n\n" +
      "تتضمن الوثيقة إشارات إلى قضايا محكمة سابقة تدعم حجج المدعى عليه وعدة معارض بما في ذلك اتفاقية الإبراء الموقعة والسجلات الطبية وإفادات الشهود.\n\n" +
      "إذا وافقت المحكمة على هذا الطلب، سيتم رفض القضية دون الذهاب إلى المحاكمة. إذا رُفض، ستستمر القضية إلى المحاكمة حيث سيتم تقديم وفحص جميع الأدلة بالتفصيل.",
    
    documentType: file.type,
    
    caseTimeline: [
      {
        date: "March 10, 2022",
        title: "Incident Occurred",
        description: "Alleged injury at defendant's property"
      },
      {
        date: "September 5, 2022",
        title: "Complaint Filed",
        description: "Plaintiff initiated lawsuit"
      },
      {
        date: "October 15, 2022",
        title: "Answer Filed",
        description: "Defendant responded to complaint"
      },
      {
        date: "November-December 2022",
        title: "Discovery Phase",
        description: "Exchange of evidence and depositions"
      },
      {
        date: "January 15, 2023",
        title: "Current Motion Filed",
        description: "Defendant's Motion for Summary Judgment"
      }
    ],
    
    parties: [
      {
        name: "John Smith",
        type: "Individual",
        role: "Plaintiff"
      },
      {
        name: "Jane Smith",
        type: "Individual",
        role: "Plaintiff"
      },
      {
        name: "ABC Corporation",
        type: "Corporation",
        role: "Defendant"
      },
      {
        name: "XYZ Insurance",
        type: "Corporation",
        role: "Co-Defendant"
      },
      {
        name: "Dr. Robert Johnson",
        type: "Individual",
        role: "Expert Witness"
      }
    ],
    
    documentMetrics: {
      totalPages: 42,
      filePages: 18,
      exhibits: 12,
      citations: 23,
      dates: 15
    }
  };
  
  toast.success("Document processed successfully!");
  return mockAnalysis;
};

export const analyzeMessage = async (message: string): Promise<DocumentAnalysis> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real app, this would call an API with the message
  console.log("Analyzing message:", message);
  
  // Generate mock analysis for the message
  return {
    documentType: "Text Message Analysis",
    simplifiedExplanation: `Your message: "${message}" has been analyzed. In a real application, this would contain an AI-generated explanation of the legal context and implications of your message.`,
    keyPoints: [
      {
        title: "Message Intent",
        description: "This appears to be a query about legal proceedings.",
        highlight: true
      },
      {
        title: "Legal Context",
        description: "The message may relate to court documentation or legal processes."
      },
      {
        title: "Potential Next Steps",
        description: "Consider consulting with a legal professional for specific advice."
      }
    ],
    arabicSummary: "هذا ملخص باللغة العربية لرسالتك. في التطبيق الفعلي، سيتم إنشاء هذا النص بواسطة خوارزمية الذكاء الاصطناعي.",
    caseTimeline: [
      {
        date: new Date().toISOString().split('T')[0],
        title: "Message Submitted",
        description: "You submitted a message for AI analysis."
      },
      {
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
        title: "Follow-up Recommended",
        description: "Recommended time to review analysis and take action."
      }
    ],
    parties: [
      {
        name: "User",
        type: "Individual",
        role: "Requestor"
      },
      {
        name: "AI System",
        type: "Service",
        role: "Analyzer"
      }
    ],
    documentMetrics: {
      totalPages: 1,
      filePages: 1,
      exhibits: 0,
      citations: 0,
      dates: 1
    }
  };
};
