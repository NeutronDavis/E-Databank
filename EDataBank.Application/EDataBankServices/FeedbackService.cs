using EDataBank.Application.Interfaces;
using EDataBank.Core.Entity.General;
using EDataBank.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Application.EDataBankServices
{
    public class FeedbackService: IFeedbackService
    {
        private readonly IRepository<Feedback> _feedbackRepo;

        private EDataBankDbContext _context;
        public FeedbackService(EDataBankDbContext context,IRepository<Feedback> feedback)
        {
            _context = context;
            _feedbackRepo = feedback;
        }

        public List<Feedback> GetFeedbackAsync()
        {
            return _context.Feedbacks.FromSqlInterpolated($"EXEC GetSortedFeedback").ToList();
        }



        public async Task<Feedback> FindFeedbackByIdAsync(int feedbackid)
        {

            return await _feedbackRepo.FindAsync(feedbackid) ?? new Feedback();
        }

        public async Task UpdateFeedbackAsync(Feedback feedback)
        {
            if (feedback != null)
            {
                await _feedbackRepo.UpdateAsync(feedback);
            }

        }
        public async Task RemoveFeedbackAsync(Feedback feedback)
        {
            await _feedbackRepo.DeleteAsync(feedback);

        }

        public async Task<bool> sendFeedback(Feedback data)
        {
            await _feedbackRepo.AddAsync(data);
            return true;
        }

    }
}
