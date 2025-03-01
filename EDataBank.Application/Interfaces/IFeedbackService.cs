using EDataBank.Core.Entity.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Application.Interfaces
{
    public interface IFeedbackService
    {
        List<Feedback> GetFeedbackAsync();
        Task<Feedback> FindFeedbackByIdAsync(int feedbackid);
        Task UpdateFeedbackAsync(Feedback feedback);
        Task RemoveFeedbackAsync(Feedback feedback);
        Task<bool> sendFeedback(Feedback data);
    }
}
