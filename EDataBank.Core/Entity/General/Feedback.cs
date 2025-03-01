using EDataBank.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Core.Entity.General
{
    public class Feedback
    {
        public int FeedbackId { get; set; }

        public string? UserEmail { get; set; }

        public byte[]? FeedbackAttachment { get; set; }

        public string? FeedbackCategory { get; set; }

        public string? FeedbackText { get; set; }

        public string? FeedbackActionTaken { get; set; }

        public FeedbackStatus FeedbackStatus { get; set; } = FeedbackStatus.Open;

        public DateTime FeedbackOpenDate { get; set; }
        public DateTime FeedbackStatusChangeDate { get; set; } = DateTime.Now!;
        public DateTime CreatedOn { get; set; } = DateTime.Now!;
    }
}
