using System;

namespace Danel.X.Web.Common
{
    public class DanelException : Exception
    {
        private ErrorCode errCode;

        public DanelException(ErrorCode errCode, string internalMessage)
            : base(internalMessage)
        {
            this.errCode = errCode;
        }

        public ErrorCode ErrorCode
        {
            get
            {
                return this.errCode;
            }
        }

        public string UserMessage
        {
            get
            {
                return this.Message;
            }
        }

        public string InternalMessage
        {
            get
            {
                return this.Message;
            }
        }
    }
}
