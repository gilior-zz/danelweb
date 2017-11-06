using Danel.X.Web.Common;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Serialization;
using System.Web;
using System.Web.Http.Filters;
using Danel.Common;

namespace Danel.WebApp.Filters
{
    /// <summary>
    /// Registered as a global filter
    /// Responsible for catching any unhandled exception and transform it to well known JSON response
    /// </summary>
    public class DanelExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            ILog logger = DIContainer.Instance.Resolve<ILog>();
            logger.Error("WebAPI exception caught by exception filter");

            //
            //  Exception.ToString prints out stack trace of inner exceptions in long line which is hard to read
            //  Below code prints only the messages of each inner exception
            //
            int index = 1;
            Exception err = context.Exception;
            while (err != null)
            {
                logger.Error("Exception " + index);
                logger.Error("    " + err.GetType().FullName);
                logger.Error("    " + err.Message);
               

                err = err.InnerException;
                index++;
            }

            //
            //  Print the whole stack trace + messages
            //
            logger.Error(context.Exception.ToString());

            //
            //  Build a standard error response
            //
            HttpResponseMessage response = context.Request.CreateResponse(HttpStatusCode.InternalServerError, ToErrorDTO(context.Exception));

            context.Response = response;
        }

        /// <summary>
        /// Convert Exception object to DTO
        /// Special care for DanelException
        /// All other exceptions are treated as InternalServerError
        /// </summary>
        /// <param name="err"></param>
        /// <returns></returns>
        private ErrorDTO ToErrorDTO(Exception err)
        {
            if (err is DanelException)
            {
                DanelException danelErr = (DanelException)err;
                return new ErrorDTO()
                {
                    ErrorCode = (int)danelErr.ErrorCode,
                    ErrorName = danelErr.ErrorCode.ToString(),
                    UserMessage = danelErr.UserMessage,
                    InternalMessage = danelErr.InternalMessage,
                };
            }
            else
            {
                return new ErrorDTO()
                {
                    ErrorCode = (int)ErrorCode.InternalServerError,
                    ErrorName = ErrorCode.InternalServerError.ToString(),
                    UserMessage = err.Message,
                    InternalMessage = err.Message,
                };
            }
        }
    }

    public class ErrorDTO
    {
        public int ErrorCode { get; set; }
        public string ErrorName { get; set; }
        public string UserMessage { get; set; }
        public string InternalMessage { get; set; }
    }
}
